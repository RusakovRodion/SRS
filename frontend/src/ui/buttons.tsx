import { Icon, Plus, Clock, Eye, Edit2, Trash2 } from "react-feather";
import { button, icon_button } from "./buttons.module.css";

export interface ButtonProps {
    text: string;
    className: string

    // https://feathericons.com/
    icon: Icon | undefined;
}

export interface ClickableProps {
    onClick: () => void;
}

export function Button({
    text,
    className,
    icon: UiIcon,
    onClick,
}: ButtonProps & ClickableProps) {
    return (
        <button className={className} onClick={onClick}>
            {text}
            {UiIcon && <UiIcon size={16} />}
        </button>
    );
}

export function AddButtonOnlyIcon({ onClick }: ClickableProps) {
    return <Button className={icon_button} icon={Plus} onClick={onClick} />;
}

export function ChangesButtonOnlyIcon({ onClick }: ClickableProps) {
    return <Button className={icon_button} icon={Clock} onClick={onClick} />;
}

export function WatchButtonOnlyIcon({ onClick }: ClickableProps) {
    return <Button className={icon_button} icon={Eye} onClick={onClick}/>;
}

export function EditButtonOnlyIcon({ onClick }: ClickableProps) {
    return <Button className={icon_button} icon={Edit2} onClick={onClick} />;
}

export function DeleteButtonOnlyIcon({ onClick }: ClickableProps) {
    return <Button className={icon_button} icon={Trash2} onClick={onClick}/>;
}

export function AddButton({ onClick }: ClickableProps) {
    return <Button text={"Добавить"} className={button} icon={Plus} onClick={onClick} />;
}

export function SaveButton({ onClick }: ClickableProps) {
    return <Button text={"Сохранить"} className={button} onClick={onClick} />;
}

export function DoneButton({ onClick }: ClickableProps) {
    return <Button text={"Готово"} className={button} onClick={onClick} />;
}

// TODO: доделать другие кнопки
