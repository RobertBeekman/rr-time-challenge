import './Clock.scss'

export function Clock(props: { start: number, end: number}) {
    return (
        <div className="clock">
            <div
                className="area"
                style={{
                    transform: `rotateZ(${props.start * 0.36}deg)`
                }}
            />

            <div
                className="area"
                style={{
                    transform: `rotateZ(${props.end * 0.36}deg)`
                }}
            />
            <div
                className="sec_hand started"
            />
        </div>
    );
}