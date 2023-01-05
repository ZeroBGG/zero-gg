export type DuoType = {
	queue: string;
	tier: string;
	position: string;

	id: string;
	password: string;
	timeSet: string;
	title: string;
	memo: string;
	nickName: string;
	mostChamp: string[];
};

export type FindDuoType = Pick<DuoType, "queue" | "tier" | "position">;

export type FindUserType = Pick<DuoType, "id" | "password">;
