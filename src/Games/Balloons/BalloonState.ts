export class BalloonState {
    constructor(time: number, revealed: boolean) {
        this.time = time;
        this.revealed = revealed;
    }

    public time: number;
    public revealed: boolean;
}
