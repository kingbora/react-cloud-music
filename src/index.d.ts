declare module '*.scss' {
    const content: any;
    export default content;
}
declare module "*.json" {
    const value: any;
    export default value;
}

interface Window {
    isElectron: boolean;
    require: any;
}