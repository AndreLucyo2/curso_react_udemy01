import { useReducer, useState } from 'react';

const HookUseReducer = () => {

    //1 - começando com o userReducer
    //Muda o estado e ainda pode executar uma função
    // dispatch : nome da função do useReducer
    const [number, dispatch] = useReducer((state, action) => {
        //Aqui pode executar alguma logica para modar o stado do campo
        return Math.random(state);
    });

    // 2 - Avançando no useReducer -----------------------------------------------------
    //Gerar id aleatórios
    const getRndId = () => {
        var ranId = Math.floor(Math.random() * 1000);
        return ranId;
    };

    //inicializar dados fake
    const initialTasks = [
        { id: getRndId(), text: "Fazer alguma coisa" },
        { id: getRndId(), text: "Fazer outra coisa" },
    ];

    //Função do reducer: Usando as actions com o switch
    const taskReducer = (state, action) => {

        //valida o tipo da ação: 
        switch (action.type) {
            //action de adicionar
            case "ADD":
                //cria um novo registro
                const newTask = {
                    id: getRndId(),
                    text: taskText,
                };

                //limpa o input
                setTaskText("");

                //retorna o novo array: mantem as que tem e adiciona a nova
                return [...state, newTask];

            //action de remover
            case "REMOVE":
                //
                return state.filter((task) => task.id !== action.id);

            //caso nao tiver action, apenas retorna o estado atual
            default:
                return state;
        }
    };

    //Controla o stado e pega o dado do input
    const [taskText, setTaskText] = useState("");

    //Declarando o reducer para disparar as ações conforme a action recebida:
    const [tasks, dispatchTask] = useReducer(taskReducer, initialTasks);

    //Action de adicionar: pega o input e add o valor no array
    const handleSubmit = (e) => {
        e.preventDefault();

        //Só add se nao tiver vazia:
        if (taskText !== "") {
            //invoca a action do reducer, passando a opção
            dispatchTask({ type: "ADD" });
        };
    };

    //Action de remover
    const removeTask = (id) => {
        //invoca a action do reducer, passando a opção, removendo pelo Id clicado
        dispatchTask({ type: "REMOVE", id: id });
    };

    return (
        <div>
            <h2> HookUseReducer</h2>
            <p>Número: {number}</p>
            <button onClick={dispatch}>Alterar número!</button>
            <h3>Lista de tarefas:</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    onChange={(e) => setTaskText(e.target.value)}
                    value={taskText}
                />
                <input type="submit" value="Enviar" style={{ margin: "5px" }} />
            </form>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} onDoubleClick={() => removeTask(task.id)}>
                        {task.id} - {task.text}
                    </li>
                ))}
            </ul>
            <hr />
        </div>
    );
};

export default HookUseReducer