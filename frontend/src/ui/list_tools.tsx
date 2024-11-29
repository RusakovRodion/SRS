import {
    AddButtonOnlyIcon,
    ChangesButtonOnlyIcon,
    DeleteButtonOnlyIcon,
    EditButtonOnlyIcon,
    WatchButtonOnlyIcon,
} from "./buttons";
import { tools } from "./list_tools.module.css";

export interface ListToolsProps {
    onAdd?: () => void;
    onChanges?: () => void;
    onView?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
}

export function ListTools({
    onAdd = () => {},
    onChanges = () => {},
    onView = () => {},
    onEdit = () => {},
    onDelete = () => {},
}: ListToolsProps) {
    return (
        <div className={tools}>
            {onAdd ? <AddButtonOnlyIcon onClick={() => onAdd()} /> : ''}
            {onChanges ? <ChangesButtonOnlyIcon onClick={() => onChanges()} /> : ''}
            {onView ? <WatchButtonOnlyIcon onClick={() => onView()} /> : ''}
            {onEdit ? <EditButtonOnlyIcon onClick={() => onEdit()} /> : ''}
            {onDelete ? <DeleteButtonOnlyIcon onClick={() => onDelete()} /> : ''}
        </div>
    );
}
