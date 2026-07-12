/// <reference types="react" />

declare namespace JSX {
    interface IntrinsicElements {
        'ion-icon': React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement> & {
                name?: string;
                src?: string;
                nomodule?: boolean;
            },
            HTMLElement
        >;
        'spline-viewer': React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLElement> & {
                url?: string;
                'loading-anim'?: boolean;
                'loading-anim-type'?: string;
            },
            HTMLElement
        >;
    }
}
