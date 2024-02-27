declare module "*.svg" {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    export { ReactComponent };
}