import type { ComponentType } from 'react';
import * as Icons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface DynamicIconProps extends LucideProps {
    name: string;
}

export const DynamicIcon = ({ name, ...props }: DynamicIconProps) => {
    const IconComponent = (Icons as any)[name] as ComponentType<LucideProps>;

    if (!IconComponent) {
        console.warn(`Icon "${name}" not found in lucide-react`);
        return <Icons.HelpCircle {...props} />;
    }

    return <IconComponent {...props} />;
};
