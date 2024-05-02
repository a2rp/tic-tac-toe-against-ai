import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import Swal from "sweetalert2";

const TicTacToe = () => {
    const box0Ref = useRef(null);
    const box1Ref = useRef(null);
    const box2Ref = useRef(null);
    const box3Ref = useRef(null);
    const box4Ref = useRef(null);
    const box5Ref = useRef(null);
    const box6Ref = useRef(null);
    const box7Ref = useRef(null);
    const box8Ref = useRef(null);

    const [boardValues, setBoardValues] = useState(["_", "_", "_", "_", "_", "_", "_", "_", "_"]);
    const [info, setInfo] = useState("Your turn");
    const [aiTurn, setAiTurn] = useState(false);
    const [hasWinner, setHasWinner] = useState("");

    const checkUserWinner = () => {
        if ((boardValues[0] === "X" && boardValues[1] === "X" && boardValues[2] === "X")
            || (boardValues[3] === "X" && boardValues[4] === "X" && boardValues[5] === "X")
            || (boardValues[6] === "X" && boardValues[7] === "X" && boardValues[8] === "X")
            || (boardValues[0] === "X" && boardValues[3] === "X" && boardValues[6] === "X")
            || (boardValues[1] === "X" && boardValues[4] === "X" && boardValues[7] === "X")
            || (boardValues[2] === "X" && boardValues[5] === "X" && boardValues[8] === "X")
            || (boardValues[0] === "X" && boardValues[4] === "X" && boardValues[8] === "X")
            || (boardValues[2] === "X" && boardValues[4] === "X" && boardValues[6] === "X")
        ) {
            setInfo("You is winner");
            setHasWinner(hasWinner => "user");
            return;
        }
    };

    const checkAIWinner = () => {
        if ((boardValues[0] === "O" && boardValues[1] === "O" && boardValues[2] === "O")
            || (boardValues[3] === "O" && boardValues[4] === "O" && boardValues[5] === "O")
            || (boardValues[6] === "O" && boardValues[7] === "O" && boardValues[8] === "O")
            || (boardValues[0] === "O" && boardValues[3] === "O" && boardValues[6] === "O")
            || (boardValues[1] === "O" && boardValues[4] === "O" && boardValues[7] === "O")
            || (boardValues[2] === "O" && boardValues[5] === "O" && boardValues[8] === "O")
            || (boardValues[0] === "O" && boardValues[4] === "O" && boardValues[8] === "O")
            || (boardValues[2] === "O" && boardValues[4] === "O" && boardValues[6] === "O")
        ) {
            setInfo("AI is winner");
            setHasWinner(hasWinner => "ai");
            return;
        }
    };

    const isBoardFull = () => {
        for (let i = 0; i < boardValues.length; ++i) {
            if (boardValues[i] === "_") {
                return false;
            }
        };
        // console.log("board is empty");
        return true;
    };

    const handleBoxClick = (boxNumber) => {
        if (hasWinner.length !== 0) {
            return;
        }
        if (isBoardFull === true) return;
        if (aiTurn === true) {
            return;
        }
        // console.log(boxNumber, "boxNumber");
        const value = boardValues[boxNumber];
        const allValues = [...boardValues];
        // console.log(boxNumber, value);
        if (value === "_") {
            allValues.splice(boxNumber, 1, "X");
            // checkUserWinner();
            setBoardValues(boardValues => allValues);
            setAiTurn(true);
        } else {
            setInfo("Box already marked");
        }
    };

    useEffect(() => {
        // console.log(boardValues);
        checkUserWinner();
        checkAIWinner();
    }, [boardValues]);

    useEffect(() => {
        if (aiTurn === true) {
            // document.querySelectorAll(".col").style.cssText = `cursor: not-allowed;`;
            const allCOls = document.querySelectorAll(".col");
            allCOls.forEach(col => {
                col.style.cssText = `cursor: not-allowed;`;
            });
            aiPlay();
        } else {
            // document.querySelector(".col").style.cssText = `cursor: default;`;
            const allCOls = document.querySelectorAll(".col");
            allCOls.forEach(col => {
                col.style.cssText = `cursor: default;`;
            });
            // aiPlay();
        }
    }, [aiTurn]);

    const aiPlay = () => {
        if (hasWinner.length !== 0) {
            return;
        }
        const emptyArray = [];
        boardValues.forEach((col, index) => {
            if (col === "_") {
                // console.log(index);
                emptyArray.push(index);
            }
        });
        // console.log(emptyArray, "empty array");
        if (emptyArray.length === 0) {
            return;
        }
        const randomIndex = emptyArray[Math.floor(Math.random() * emptyArray.length)];
        if (boardValues[randomIndex] === "_") {
            setInfo("AI playing... pls wait");
            const allValues = [...boardValues];
            allValues.splice(randomIndex, 1, "O");
            // checkAIWinner();
            setBoardValues(boardValues => allValues);
            setAiTurn(aiTurn => false);
        }
        setInfo("Your turn");
    };

    const reset = () => {
        Swal.fire({
            title: "Do you want to reset?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes reset",
            denyButtonText: `Don't`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                setBoardValues(boardValues => ["_", "_", "_", "_", "_", "_", "_", "_", "_"]);
                setInfo("Your turn");
                setAiTurn(false);
                setHasWinner("");
            }
        });
    };

    useEffect(() => {
        // console.log(hasWinner, "hasWinner");
    }, [hasWinner]);

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.title}>Tic Tac Toe</div>

                <div className={styles.controlsSection}>
                    <div className={styles.row1}>
                        <div ref={box0Ref} className={`${styles.col1} col`} onClick={() => handleBoxClick(0)}>
                            {boardValues[0]}
                            <div className={styles.index}>{"00"}</div>
                        </div>
                        <div ref={box1Ref} className={`${styles.col2} col`} onClick={() => handleBoxClick(1)}>
                            {boardValues[1]}
                            <div className={styles.index}>{"01"}</div>
                        </div>
                        <div ref={box2Ref} className={`${styles.col3} col`} onClick={() => handleBoxClick(2)}>
                            {boardValues[2]}
                            <div className={styles.index}>{"02"}</div>
                        </div>
                    </div>
                    <div className={styles.row2}>
                        <div ref={box3Ref} className={`${styles.col1} col`} onClick={() => handleBoxClick(3)}>
                            {boardValues[3]}
                            <div className={styles.index}>{"10"}</div>
                        </div>
                        <div ref={box4Ref} className={`${styles.col2} col`} onClick={() => handleBoxClick(4)}>
                            {boardValues[4]}
                            <div className={styles.index}>{"11"}</div>
                        </div>
                        <div ref={box5Ref} className={`${styles.col3} col`} onClick={() => handleBoxClick(5)}>
                            {boardValues[5]}
                            <div className={styles.index}>{"12"}</div>
                        </div>
                    </div>
                    <div className={styles.row3}>
                        <div ref={box6Ref} className={`${styles.col1} col`} onClick={() => handleBoxClick(6)}>
                            {boardValues[6]}
                            <div className={styles.index}>{"20"}</div>
                        </div>
                        <div ref={box7Ref} className={`${styles.col2} col`} onClick={() => handleBoxClick(7)}>
                            {boardValues[7]}
                            <div className={styles.index}>{"21"}</div>
                        </div>
                        <div ref={box8Ref} className={`${styles.col3} col`} onClick={() => handleBoxClick(8)}>
                            {boardValues[8]}
                            <div className={styles.index}>{"22"}</div>
                        </div>
                    </div>
                </div>

                <div className={styles.info}>{info}</div>

                <input
                    type="button"
                    onClick={reset}
                    value="reset"
                    className={styles.resetButton}
                />
            </div>
        </div>
    )
}

export default TicTacToe

