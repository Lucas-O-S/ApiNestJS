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
    created_at: string;

    @UpdateDateColumn()
    update_at: string;

    @Column({
        enum:[1,2]
    })
    role: number;
}