import {
    ChangesButtonOnlyIcon,
    DeleteButtonOnlyIcon,
    EditButtonOnlyIcon,
    WatchButtonOnlyIcon,
} from "./buttons";
import { tools } from "./list_tools.module.css";

export interface ListToolsProps {
    onChanges?: () => void;
    onView?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

export function ListTools({
    onChanges = () => {},
    onView = () => {},
    onEdit = () => {},
    onDelete = () => {},
}: ListToolsProps) {
    return (
        <div className={tools}>
            <ChangesButtonOnlyIcon onClick={() => onChanges()} />
            <WatchButtonOnlyIcon onClick={() => onView()} />
            <EditButtonOnlyIcon onClick={() => onEdit()} />
            <DeleteButtonOnlyIcon onClick={() => onDelete()} />
        </div>
    );
}
