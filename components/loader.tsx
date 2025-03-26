import { ThreeDots } from "react-loader-spinner";

export default function Loader() {
    return (
        <ThreeDots
            ariaLabel="three-dots-loading"
            color="#000000"
            height={20}
            radius={5}
        />
    );
}
