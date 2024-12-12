import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity("users")
export class UserEntity{
    
    @PrimaryGeneratedColumn({
        unsigned: true,
        
    })
    id: number;

    @Column({
        length: 127

    })
    name: string;

    @Column({
        unique:true,
        length: 127
    })
    email: string
    
    @Column({
        length: 127

    })
    password:string;
    
    @CreateDateColumn()
    created_at?: Date;

    @UpdateDateColumn()
    update_at?: Date;

    @Column({
        enum:[1,2]
    })
    role: number;
}