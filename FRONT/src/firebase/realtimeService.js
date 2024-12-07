import { database } from "./firebase";
import { ref, set, onValue, update, remove, push ,getDatabase} from "firebase/database";

// テキストボックスを追加
export const addTextBox = async (box) => {
const newBoxRef = push(ref(database, "textBoxes/"));
await set(newBoxRef, box);
return newBoxRef.key; // 追加したボックスのIDを返す
};

// テキストボックスをリアルタイムで取得
export const subscribeToTextBoxes = (callback) => {
const textBoxRef = ref(database, "textBoxes/");
return onValue(textBoxRef, (snapshot) => {
	const data = snapshot.val();
	const textBoxes = data
	? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
	: [];
	callback(textBoxes);
});
};

// テキストボックスを更新
export const updateTextBox = async (id, updatedData) => {
const boxRef = ref(database, `textBoxes/${id}`);
await update(boxRef, updatedData);
};

// テキストボックスを削除
export const deleteTextBox = async (id) => {
const boxRef = ref(database, `textBoxes/${id}`);
await remove(boxRef);
};

// コメントを保存する関数
export const saveComment = async (commentText) => {
	const db = getDatabase();
	const commentRef = ref(db, 'comments'); // "comments" ノードに保存
	await set(commentRef, { text: commentText });
};

export const subscribeToComment = (callback) => {
	const db = getDatabase();
	const commentRef = ref(db, 'comments');
	const unsubscribe = onValue(commentRef, (snapshot) => {
	  const data = snapshot.val();
	  callback(data ? data.text : "");
	});
  
	return unsubscribe; // リスナーを解除する関数を返す
};