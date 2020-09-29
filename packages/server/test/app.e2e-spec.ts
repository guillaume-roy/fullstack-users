import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as bcrypt from 'bcryptjs';
import { getRepository } from 'typeorm';
import { User } from '../src/users/entities/user.entity';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces';
import * as requestIp from 'request-ip';
import { FranceRequestGuard } from '../src/france-request.guard';

const FRENCH_IP_ADDRESS = '51.83.90.83';
const US_IP_ADDRESS = '8.8.8.8';

async function clearUsers() {
  const count = await getRepository(User).count();
  if (count > 0) {
    await getRepository(User).clear();
  }
}

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let guard: FranceRequestGuard;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestExpressApplication>();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        disableErrorMessages: process.env.NODE_ENV === 'production',
      }),
    );
    app.use(requestIp.mw());
    await app.init();

    guard = app.get<FranceRequestGuard>(FranceRequestGuard);
    jest.spyOn(guard, 'getClientIP').mockReturnValue(FRENCH_IP_ADDRESS);

    await clearUsers();
  });

  describe('UsersController', () => {
    it('/users (POST)', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          email: 'test@test.com',
          firstname: 'Jane',
          lastname: 'Doe',
          password: 'Test123456!',
        })
        .expect(201)
        .expect(async res => {
          expect(res.body.id).toBeDefined();
          expect(res.body.email).toBe('test@test.com');
          expect(res.body.firstname).toBe('Jane');
          expect(res.body.lastname).toBe('Doe');
          expect(await bcrypt.compare('Test123456!', res.body.password)).toBe(
            true,
          );
        });
    });

    it('/users (POST) should fail on email', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          email: 'dfsfsfsdfds',
          firstname: 'Jane',
          lastname: 'Doe',
          password: 'Test123456!',
        })
        .expect(400);
    });

    it('/users (POST) should fail on firstname', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          email: 'test@test.com',
          lastname: 'Doe',
          password: 'Test123456!',
        })
        .expect(400);
    });

    it('/users (POST) should fail on lastname', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          email: 'test@test.com',
          firstname: 'Jane',
          password: 'Test123456!',
        })
        .expect(400);
    });

    it('/users (POST) should fail on password', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          email: 'test@test.com',
          firstname: 'Jane',
          lastname: 'Doe',
          password: '1234',
        })
        .expect(400);
    });

    it('/users (POST) should fail on IP outside of France', () => {
      jest.spyOn(guard, 'getClientIP').mockReturnValue(US_IP_ADDRESS);
      return request(app.getHttpServer())
        .post('/users')
        .set('X-Forwarded-For', US_IP_ADDRESS)
        .send({
          email: 'test@test.com',
          firstname: 'Jane',
          lastname: 'Doe',
          password: '1234',
        })
        .expect(403);
    });

    it('/users (GET)', () => {
      return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect(res => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body).toHaveLength(1);
        });
    });

    it('/users (GET) should search on firstname', () => {
      request(app.getHttpServer())
        .post('/users')
        .send({
          email: 'test@test.com',
          firstname: 'Jane',
          lastname: 'Doe',
          password: 'Test123456!',
        });

      return request(app.getHttpServer())
        .get('/users')
        .query({ query: 'jan' })
        .expect(200)
        .expect(res => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body[0].firstname).toBe('Jane');
        });
    });
  });

  afterAll(async () => {
    await clearUsers();
    app.close();
  });
});
