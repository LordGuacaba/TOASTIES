export type Points = 15 | 10 | -5

export type Buzz = {
    player: string,
    points: Points,
}

export type Question = {
    number: number,
    buzzes: Buzz[],
}

export type Scoresheet = {
    reader?: string,
    roster: string[],
    results: Question[]
}