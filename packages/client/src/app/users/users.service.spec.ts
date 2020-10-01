import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { User } from './user.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UsersService', () => {
  let service: UsersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should findAll users', () => {
    const user1 = new User();
    user1.id = '123456';
    user1.email = 'john.smith@acme.com';
    user1.firstname = 'John';
    user1.lastname = 'Smith';
    user1.password = 'fhksfhkmfmqf4522!:';
    const user2 = new User();
    user2.id = '654321';
    user2.email = 'jane.doe@acme.com';
    user2.firstname = 'Jane';
    user2.lastname = 'Doe';
    user2.password = '5352;:;hkDKDN';
    const users = [user1, user2];

    service.findAll().subscribe(resultUsers => {
      expect(resultUsers.length).toBe(2);
      expect(resultUsers).toEqual(users);
    }, fail);


    const req = httpTestingController.expectOne('http://localhost:3000/users');
    expect(req.request.method).toEqual('GET');
    req.flush(users);
    httpTestingController.verify();
  });

  it('should findAll users with query', () => {
    const user1 = new User();
    user1.id = '123456';
    user1.email = 'john.smith@acme.com';
    user1.firstname = 'John';
    user1.lastname = 'Smith';
    user1.password = 'fhksfhkmfmqf4522!:';
    const users = [user1];

    service.findAll('John').subscribe(resultUsers => {
      expect(resultUsers.length).toBe(1);
      expect(resultUsers).toEqual(users);
    }, fail);


    const req = httpTestingController.expectOne('http://localhost:3000/users?query=John');
    expect(req.request.method).toEqual('GET');
    req.flush(users);
    httpTestingController.verify();
  });

  it('should create a new user', () => {
    const user1 = new User();
    user1.id = '123456';
    user1.email = 'john.smith@acme.com';
    user1.firstname = 'John';
    user1.lastname = 'Smith';
    user1.password = 'fhksfhkmfmqf4522!:';

    service.create('john.smith@acme.com', 'John', 'Smith', 'fhksfhkmfmqf4522!:').subscribe(createdUser => {
      expect(createdUser).toEqual(user1);
    }, fail);


    const req = httpTestingController.expectOne('http://localhost:3000/users');
    expect(req.request.method).toEqual('POST');
    req.flush(user1);
    httpTestingController.verify();
  });
});
