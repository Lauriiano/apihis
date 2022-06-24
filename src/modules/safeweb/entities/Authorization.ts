import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("authorization_safeweb")
class Authorization {
    @PrimaryGeneratedColumn()
    id: number;
    @CreateDateColumn()
    created_at: Date;
    @Column({ nullable: true })
    identifierCA: string;
    @Column({ nullable: true })
    state: string;
    @Column({ nullable: true })
    expirationDate: string;
    @Column({ nullable: true })
    serialNumber: string;
    @Column({ nullable: true })
    dta_cri_token: Date;
    @Column({ nullable: true })
    access_token: string;
    @Column({ nullable: true })
    expires_in: number;
    @Column({ nullable: true })
    slot_alias: string;
    @Column()
    status: number;
    @Column({ nullable: true })
    error: string;
}

export { Authorization };

