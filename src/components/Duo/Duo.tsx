import React, {
	ChangeEvent,
	FormEvent,
	useCallback,
	useEffect,
	useState,
} from "react";
import styles from "./Duo.module.scss";
import { dbService } from "src/firebase";
import { DuoType } from "./DuoType";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import { queueArr, tierArr, postionArr } from "./DuoArr";

const testarr = [
	{
		id: 1,
		timeSet: "8분 전",
		title: "골드 듀오 구함!",
		memo: "기사님 모집합니다~",
		nickName: "방탄소년단",
		mostChamp: ["크샨테", "카밀", "아트록스"],
	},
];

const Duo = () => {
	const [lolInfo, setLolInfo] = useState<any[]>([]);
	const [userId, setUserId] = useState("");
	const [userPass, setUserPass] = useState("");
	const [queue, setQueue] = useState("");
	const [tier, setTier] = useState("");
	const [position, setPosition] = useState("");
	const [title, setTitle] = useState("");
	const [memo, setMemo] = useState("");
	const [nickname, setNickname] = useState("");

	useEffect(() => {
		const q = query(collection(dbService, "myLOLInfo"));
		onSnapshot(q, (querySnapshot) => {
			const myLol = querySnapshot.docs.map((docs) => ({
				id: docs.id,
				...docs.data(),
			}));
			setLolInfo(myLol);
		});
	}, []);

	const onChangeId = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const { value } = event.currentTarget;
			setUserId(value);
		},
		[userId]
	);

	const onChagnePass = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const { value } = event.currentTarget;
			setUserPass(value);
		},
		[userPass]
	);

	const onChangeQueue = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => {
			const { value } = event.currentTarget;
			setQueue(value);
		},
		[queue]
	);

	const onChangeTier = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => {
			const { value } = event.currentTarget;
			setTier(value);
		},
		[tier]
	);

	const onChangePosition = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => {
			const { value } = event.currentTarget;
			setPosition(value);
		},
		[position]
	);

	const onChagneTitle = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const { value } = event.currentTarget;
			setTitle(value);
		},
		[title]
	);

	const onChagneNickname = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const { value } = event.currentTarget;
			setNickname(value);
		},
		[nickname]
	);

	const onChagneMemo = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const { value } = event.currentTarget;
			setMemo(value);
		},
		[memo]
	);

	const onSubmit = async (event: FormEvent) => {
		event.preventDefault();
		const myLOLInfo: DuoType = {
			queue: queue,
			tier: tier,
			position: position,

			id: userId,
			password: userPass,
			timeSet: `${new Date()}`,
			title: title,
			memo: memo,
			nickName: nickname,
			mostChamp: [""],
		};

		await addDoc(collection(dbService, "myLOLInfo"), myLOLInfo);

		setUserId("");
		setUserPass("");
		setQueue("");
		setTier("");
		setPosition("");
		setTitle("");
		setMemo("");
		setNickname("");
	};

	return (
		<>
			<main>
				<section>
					<div>1</div>
					<form onSubmit={onSubmit}>
						<label htmlFor="userid">ID : </label>
						<input
							type="text"
							name="userid"
							id="userid"
							value={userId}
							onChange={onChangeId}
						/>
						<label htmlFor="userpass"> Password : </label>
						<input
							type="password"
							name="userpass"
							id="userpass"
							value={userPass}
							onChange={onChagnePass}
						/>
						<br />
						<select name="queue" onChange={onChangeQueue} value={queue}>
							{queueArr.map((item, idx) => {
								return (
									<>
										<option value={item} key={idx}>
											{item}
										</option>
									</>
								);
							})}
						</select>
						<select name="tier" onChange={onChangeTier} value={tier}>
							{tierArr.map((item, idx) => {
								return (
									<>
										<option value={item} key={idx}>
											{item}
										</option>
									</>
								);
							})}
						</select>
						<select
							name="position"
							onChange={onChangePosition}
							value={position}
						>
							{postionArr.map((item, idx) => {
								return (
									<>
										<option value={item} key={idx}>
											{item}
										</option>
									</>
								);
							})}
						</select>
						<br />
						<input
							type="text"
							placeholder="title"
							value={title}
							onChange={onChagneTitle}
						/>
						<input
							type="text"
							placeholder="memo"
							value={memo}
							onChange={onChagneMemo}
						/>
						<input
							type="text"
							placeholder="nickname"
							value={nickname}
							onChange={onChagneNickname}
						/>
						<button type="submit">
							<span>확인</span>
						</button>
					</form>
				</section>
				<section>
					<div>
						<select name="queue">
							<option value="all_rank">전체</option>
						</select>
						<select name="tier">
							<option value="all_tier">전체</option>
						</select>
						<select name="position">
							<option value="all_po">전체</option>
						</select>
						<button>듀오찾기</button>
					</div>
				</section>
				<section className={styles.section_card}>
					<div className={styles.div_card}>
						<ul className={styles.ul_card}>
							{lolInfo.map((item, idx) => {
								return (
									<>
										<li key={`${item.id}_${idx}`} className={styles.li_card}>
											<div className={styles.list_div_card}>
												<div className={styles.div_time}>
													<p>{item.timeSet}</p>
												</div>
												<div className={styles.div_content}>
													<h2>{item.title}</h2>
													<p>{item.memo}</p>
												</div>
												<div className={styles.div_info}>
													<p>
														id : {item.nickName} | most : {item.mostChamp}
													</p>
												</div>
											</div>
										</li>
									</>
								);
							})}
						</ul>
					</div>
				</section>
			</main>
		</>
	);
};

export default Duo;
