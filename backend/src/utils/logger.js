import winston from "winston";

// Filter to store exact log levels for specific files
const fileFilter = (levelToKeep) => {
    return winston.format((info) => {
        return info.level === levelToKeep ? info : false;
    })();
};

const Logger = winston.createLogger({
    level: "debug",
    levels: winston.config.npm.levels,
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.json()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
    
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize({ all: true }),
                winston.format.simple()
            )
        }),
        // 2. Info File: Receives everything (info, warn, error)
        new winston.transports.File({ 
            filename: './logs/info.log', 
            level: 'info' 
        }),
        // 3. Warn File: Receives ONLY warn logs
        new winston.transports.File({ 
            filename: './logs/warn.log', 
            level: 'warn',
            format: winston.format.combine(fileFilter('warn'), winston.format.json(),winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }))
        }),
        // 4. Error File: Receives ONLY error logs
        new winston.transports.File({ 
            filename: './logs/error.log', 
            level: 'error',
            format: winston.format.combine(fileFilter('error'), winston.format.json(),winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }))
        }),
       
    ],
      exceptionHandlers: [
        new winston.transports.File({ filename: './logs/error.log' })
    ],
    rejectionHandlers: [
        new winston.transports.File({ filename: './logs/error.log' })
    ],
    exitOnError: true,
});

export default Logger;
