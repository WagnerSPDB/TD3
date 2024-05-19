import styles from './Footer.module.css'
function Footer(){
    return(
        <footer className={styles.footer}>
            <ul className={styles.footer_icons}>
                <li>
                <a href="https://github.com/WagnerSPDB"><img src={require("../icons/github.png")} alt="GitHub" className={styles.icon}/></a>
                </li>
                <li>
                <a href="https://www.instagram.com/wagnerspdb/"><img src={require("../icons/instagram.png")} alt="Instagram" className={styles.icon}/></a>
                </li>
                <li>
                <a href="https://www.linkedin.com/in/wagnerspdb/"><img src={require("../icons/linkedin.png")} alt="LinkedIn" className={styles.icon}/></a>
                </li>
            </ul>
        </footer>
    )
}
export default Footer