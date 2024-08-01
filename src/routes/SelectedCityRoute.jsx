import { useSearchParams } from "react-router-dom"
import SelectedCity from "../components/selected-city/SelectedCity"

export default function SelectedCityRoute() {
    // mettiamo dentro un array che chiamo params tutti i valori che arrivano nell'oggetto useSearchPARAMS
    const [params] = useSearchParams()
    // e li vado a prendere con get
    const lat = params.get('lat')
    const lon = params.get('lon')
    
    
    return (
        <>
            <SelectedCity coords={{lat, lon}}/>
        </>
    )
}