import { useNavigate, useParams, useLocation } from "react-router-dom";
import topToysDataJson from "../topToysData.json";
import CarouselModal from "../product-modal/CarouselModal";

const data = topToysDataJson as {
    id: string;
    title: string;
    desc?: string;
    imgSrc: string;
}[];

export default function ModalCard() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams<{ id: string }>();

    const index = data.findIndex((item) => item.id === id);
    if (index === -1) {
        navigate("/", { replace: true });
        return null;
    }

    /** Fecha:
     *  • se veio de background → -1
     *  • se entrou direto      → landing (replace)
     */
    const close = () => {
        if (location.state?.background) navigate(-1);
        else navigate("/", { replace: true });
    };

    return (
        <CarouselModal
            open={true}
            onOpenChange={(open) => !open && close()}
            items={data.map(({ id, title, desc, imgSrc }) => ({
                id,
                title,
                desc,
                imgSrc,
            }))}
            initialIndex={index}
        />
    );
}
