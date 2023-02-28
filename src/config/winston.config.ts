import {
  utilities as nestWinstonModuleUtilities,
  WinstonModuleOptions,
} from 'nest-winston';
import * as winston from 'winston';
import { format } from 'date-fns';

const getRotativeFilename = () => {
  return format(new Date(), 'dd-MM-yyyy');
};

export const winstonConfig: WinstonModuleOptions = {
  levels: winston.config.npm.levels,
  level: 'verbose',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
    }),
    new winston.transports.File({
      level: 'verbose',
      filename: `${getRotativeFilename()}-projeto-alianca.log`,
      dirname: 'logs',
    }),
  ],
};
