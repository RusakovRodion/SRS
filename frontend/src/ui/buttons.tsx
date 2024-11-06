import { Icon, Plus } from "react-feather";
import { button } from "./buttons.module.css";

export interface ButtonProps {
    text: string;

    // https://feathericons.com/
    icon: Icon | undefined;
}

export interface ClickableProps {
    onClick: () => void;
}

export function Button({
    text,
    icon: UiIcon,
    onClick,
}: ButtonProps & ClickableProps) {
    return (
        <button className={button} onClick={onClick}>
            {text}
            {UiIcon && <UiIcon size={16} />}
        </button>
    );
}

export function AddButton({ onClick }: ClickableProps) {
    return <Button text={"Добавить"} icon={Plus} onClick={onClick} />;
}

export function SaveButton({ onClick }: ClickableProps) {
    return <Button text={"Сохранить"} onClick={onClick} />;
}

export function DoneButton({ onClick }: ClickableProps) {
    return <Button text={"Готово"} onClick={onClick} />;
}

// TODO: доделать другие кнопки
