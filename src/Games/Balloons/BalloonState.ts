export class BalloonState {
    constructor(time: number, offset: number, revealed: boolean) {
        this.time = time;
        this.offset = offset;
        this.revealed = revealed;
    }

    public time: number;
    public offset: number;
    public revealed: boolean;
}
