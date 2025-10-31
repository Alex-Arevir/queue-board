import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap(){
    const app = await NestFactory.create(AppModule);

    //Enable global validation pipe
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,//remuve properties that do not have any decorators
        forbidNonWhitelisted:true, //throw an error if non-whitelisted properties are present
        transform:true, //automatically transform payloads to be objects typed according to their DTO classes
        
    }),
);
app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials:true,

});

const port = process.env.PORT || 3000;
await app.listen(port);

console.log(`Server is running on PORT: ${port}`);


}

bootstrap();