import { Frown, Loader } from "react-feather";
import { error_banner } from "./status_banner.module.css";

export interface StatusBannerProps {
    text?: string;
}

export function ErrorBanner({
    text = "Произошла ошибка при загрузке страницы",
}: StatusBannerProps) {
    return (
        <div className={error_banner}>
            <span>{text}</span> <Frown size={40} />
        </div>
    );
}

export function LoadingBanner({ text = "Загрузка" }: StatusBannerProps) {
    return (
        <div className={error_banner}>
            <span>{text}</span> <Loader className="animation_spin" size={40} />
        </div>
    );
}
