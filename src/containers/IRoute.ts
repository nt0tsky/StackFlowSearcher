export interface IRoute<P> {
    match: IMatch<P>;
}

export interface IMatch<P> {
    params: P;
}