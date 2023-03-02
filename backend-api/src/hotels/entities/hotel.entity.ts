import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Hotel {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column({ unique: true, nullable: false })
    name : string;

    @Column({ unique: true, nullable: false })
    location : string;

    @Column({nullable: false })
    description: string;

    @Column("simple-array", {nullable: false})
    picture_list : string[];

}
