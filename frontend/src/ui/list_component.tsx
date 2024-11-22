import { ReactNode } from "react";

import "./list_component.module.css";

export interface IProps<T> {
    renderOption: (option: T) => ReactNode;
    options: Array<T>;
}

export function ListComponent<T>({ options, renderOption }: IProps<T>) {
    return (
        <div className="list">
            {options.map((option: T) => renderOption(option))}
        </div>
    );
}
