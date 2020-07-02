import { verifyWindowObj } from "utils/Environment";

export default function loadSurvey() {
    if(verifyWindowObj() && window.hj){
        hj('trigger', 'tps-undersokelse-nei')
    }
}
