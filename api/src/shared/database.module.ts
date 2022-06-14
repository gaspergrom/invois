import {DynamicModule, Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from "../features/auth/entities/user.entity";

@Module({
    exports: [TypeOrmModule],
})
export class DatabaseModule {
    static forRoot(): DynamicModule {
        return {
            module: DatabaseModule,
            imports: [
                TypeOrmModule.forRootAsync({
                    useFactory: () => {
                        const options: any = {
                            type: 'sqlite',
                            database: 'db.sqlite',
                            entities: [User],
                            synchronize: true,
                        };

                        return options;
                    },
                }),
            ],
        };
    }
}
