/* eslint-disable @typescript-eslint/no-explicit-any */

interface IonIconProps {
    name: string;
    class?: string;
    style?: React.CSSProperties;
}

// Ionicons is loaded via script tag and rendered as a web component.
// This wrapper avoids TypeScript errors while preserving correct rendering.
const IonIcon = ({ name, ...rest }: IonIconProps) => {
    const Tag = "ion-icon" as any;
    return <Tag name={name} {...rest} />;
};

export default IonIcon;
