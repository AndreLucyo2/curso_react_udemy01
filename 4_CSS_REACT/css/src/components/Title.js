import styles from './Title.module.css'

function Title() {
    return (
        <div>
            {/* Outra forma de aplicar estilo menos utilizada*/}
            <h1 className={styles['my_title']}>
                Meu titulo 1 com CSS Module
            </h1>
            {/* cria o nome da classe unico */}
            <h1 className={styles.my_title}>
                Meu titulo 2 com CSS Module
            </h1>
            {/* Outra forma de aplicar estilo menos utilizada*/}
            <h1 className={styles['my_title']}>
                Meu titulo 3 com CSS Module
            </h1>
        </div>
    )
}

export default Title