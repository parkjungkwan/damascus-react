import React, {Component} from "react";
import ChatBot from 'react-simple-chatbot';
interface State {
    name: string
}
class MyChatBot extends Component<State>{
    state: State = {
        name: ''
    }
    public render() {
        return (
            <div>
                <h1>챗봇</h1>
                <ChatBot
                    // steps 챗봇의 시나리오를 작성한다.
                    steps={[
                        {
                            id: '1',
                            message: '이름을 알려주세요.',
                            // trigger는 다음 이동해야 할 시나리오를 가져온다.
                            trigger: 'name',
                        },
                        {
                            id: 'name',
                            // user에 true넣으면 값이 입력 된다.
                            user: true,
                            validator: (value) => {
                                if (value === '') {
                                    return '이름이 없습니다. 다시입력해주세요.';
                                }
                                return true;
                            },
                            trigger: '2',
                        },
                        {
                            id: '2',
                            message: '안녕하세요. {previousValue}님, 만나서 반갑습니다.',
                            end: true,
                        },
                    ]}

                />
            </div>
        );
    }
}
export default MyChatBot