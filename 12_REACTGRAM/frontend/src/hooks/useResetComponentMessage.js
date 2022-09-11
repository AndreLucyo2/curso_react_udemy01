// Redux
import { resetMessage } from "../slices/photoSlice";

//componente para padronizar o reset da mensagem
export const useResetComponentMessage = (dispatch) => {

    return () => {
        setTimeout(() => {
            dispatch(resetMessage());
        }, 2000);
    };
};
