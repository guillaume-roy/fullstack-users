import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import { format, transports } from 'winston';

export function initLogger() {
  return WinstonModule.createLogger({
    transports: [
      new transports.Console({
        handleExceptions: true,
        level: process.env.LOG_LEVEL,
        format: format.combine(
          format.colorize(),
          format.simple(),
          format.timestamp(),
          nestWinstonModuleUtilities.format.nestLike(),
        ),
      }),
    ],
  });
}
