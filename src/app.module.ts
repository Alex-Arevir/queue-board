import {Module} from '@nestjs/common';
import{ AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { MessagesModule } from './messages/messages.module';
import { EventsGateway } from './events/events.gateway';

@Module({
    imports: [
        PrismaModule,
        AuthModule,
        UsersModule,
        TasksModule,
        MessagesModule,
        
    ],
    controllers: [AppController],
    providers: [AppService,EventsGateway],

})
export class AppModule{}
