import { forwardRef, useRef, useImperativeHandle } from "react";

//envolve o componente com a referencia forwardRef
const SomeComponent = forwardRef((props, ref) => {

    //referencia local: puxa a referencia como propriedade
    const localInputRef = useRef();

    //tem acesso a ref recebido para o input
    useImperativeHandle(ref, () => {
        return {
            
            validate: () => {
                if (localInputRef.current.value.length > 3) {
                    localInputRef.current.value = "";
                }
            },
        };
    });

    return (
        //quem vai executar é o componente pai
        <div>
            <p>Insira máximo 3 caracteres!</p>
            <input type="text" ref={localInputRef} />
        </div>
    );
});

export default SomeComponent;