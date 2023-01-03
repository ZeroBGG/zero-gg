import React from "react";
import styles from "./Duo.module.scss";
import { app, dbService, dbAddDoc, dbCollection } from "src/firebase";

console.log(app);

const Duo = () => {
	return (
		<>
			<main>
				<section>
					<div>
						<button>듀오찾기</button>
					</div>
					<div>
						<select name="queue">
							<option value="duo_rank">듀오</option>
							<option value="free_rank">자유랭</option>
							<option value="narak">칼바람</option>
						</select>
						<select name="tier">
							<option value="bronze_silver">브실 버스기사들</option>
							<option value="silver_gold">실골 버스승객들</option>
							<option value="gold_platinum">골플 버스취객들</option>
						</select>
						<select name="position">
							<option value="top">ㅌ</option>
							<option value="jungle">김병만</option>
							<option value="supporter">도구</option>
						</select>
						<button>듀오찾기</button>
					</div>
				</section>
				<section>
					<div>
						<div>
							<div>
								<img src="https://www.dogdrip.net/dvs/d/22/01/07/54c83af66e4cd799c4b9fcb622b8e675.webp"></img>
							</div>
							<div>
								<img src="https://www.dogdrip.net/dvs/d/22/01/07/54c83af66e4cd799c4b9fcb622b8e675.webp"></img>
							</div>
							<div>
								<img src="https://www.dogdrip.net/dvs/d/22/01/07/54c83af66e4cd799c4b9fcb622b8e675.webp"></img>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
};

export default Duo;
