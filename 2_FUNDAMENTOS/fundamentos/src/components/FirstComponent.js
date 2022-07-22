//Arquivos de estilo

import MyComponent from "./MyComponent"

const FirstComponent = () => {

    //isso é um comentario da função

    /*
    Comentarios com multiplas linhas 
    */

    return (
        <div>
            {/* Comentario dentroe do JSX */}
            <h1>Meu primeiro componente</h1>
            <MyComponent/>
        </div>
    )

}

export default FirstComponent