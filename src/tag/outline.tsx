import {Tag, TagLabel, TagRightIcon} from "@chakra-ui/react";
import {IconType} from "react-icons";

type MotionProps = {
    label: String;
    w?: string;
    size: "sm" | "md" | "lg" | "2xl";
    icon: IconType;
    color: (string & {}) | "whiteAlpha" | "blackAlpha" | "gray" | "red" | "orange" | "yellow" | "green" | "teal" | "blue" | "cyan" | "purple" | "pink" | "linkedin" | "facebook" | "messenger" | "whatsapp" | "twitter" | "telegram" | undefined;
};

export const TagOutline = ({size, label, w, icon, color}: MotionProps) => {
    return (
        <Tag size={size}
             justifyContent={"space-between"}
             variant='outline'
             w={w}
             colorScheme={color}>
            <TagLabel>{label}</TagLabel>
            <TagRightIcon as={icon}/>
        </Tag>
    );
};