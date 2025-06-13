export type Statline = {
    name: string,
    played: number,
    powers: number,
    gets: number,
    negs: number,
    written: number,
    read: number,
}

export type Statsheets = {
    writers: string[],
    statsheets: Statline[][],
}

export const points = (statline: Statline) => (
    15*statline.powers 
    + 10*statline.gets 
    + -5*statline.negs 
    + 10*Math.min(statline.written, 20)
    + 5*Math.min(statline.read, 20)
);

export const ppg = (statline: Statline) => (
    statline.played > 0 ? (
        15*statline.powers 
        + 10*statline.gets 
        + -5*statline.negs
        / (statline.played / 20)
    ) : 0
    
);