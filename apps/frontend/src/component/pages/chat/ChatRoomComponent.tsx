import React, { Fragment, Suspense, useEffect, useRef, useState } from 'react';
import { Client, Message } from '@stomp/stompjs';
import { AddReactionOutlined, CloseOutlined, SendOutlined, UploadFileOutlined } from '@mui/icons-material';
import { useAppContext } from '../../../store/AppContext';
import SockJS from 'sockjs-client';
import { format, parseISO } from 'date-fns';

enum ETypeMessage {
  SEND = "SEND",
  RECEIVE = "RECEIVE"
}

type MessageEntity = {
  id: number,
  message: string,
  type: ETypeMessage,
  createAt: string
}

const ChatRoom: React.FC = () => {
  const { isOpenChat, setIsOpenChat, setIsConnectWebsocket, isConnectWebsocket } = useAppContext();
  const [messages, setMessages] = useState<MessageEntity[]>([]);
  const [message, setMessage] = useState<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    connect();
    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, []);

  const connect = () => {
    const tokenString = localStorage.getItem("token");
    const token = tokenString ? JSON.parse(tokenString) : null;
    const accessToken = token ? token.accessToken : "";

    if (accessToken) {
      const socket = new SockJS(`${import.meta.env.VITE_SERVERURL}/api/ws`);
      const client = new Client({
        webSocketFactory: () => socket,
        connectHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      client.onConnect = function () {
        setIsConnectWebsocket(true);

        client.subscribe('/send/messages', (message: Message) => {
          setMessages(prevMessages => [...prevMessages, JSON.parse(message.body) as MessageEntity]);
        });
        client.subscribe('/receive/messages', (message: Message) => {
          console.log(JSON.parse(message.body))
          setMessages(JSON.parse(message.body));
        });

        client.publish({ destination: '/app/receive', body: message });
      };

      client.onStompError = function (frame) {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      };

      clientRef.current = client;
      client.activate();
    }
  };

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSend = () => {
    if (clientRef.current && message.trim()) {
      clientRef.current.publish({ destination: '/app/send', body: message });
      setMessage('');
    }
  };

  const timeDisplay = (isoString: string) => {
    const date = parseISO(isoString);
    const formattedDate = format(date, 'yyyy-MM-dd HH:mm');

    return (
        <div>
            <p>{formattedDate}</p>
        </div>
    );
};

  return (
    <Fragment>
      <Suspense>
        <div className={`z-30 bg-indigo-400 bg-opacity-25 w-full fixed h-[100svh] left-0 transition-all duration-500 ${isOpenChat ? "bottom-0" : "-bottom-full"}`}>
          <div className='bg-white text-gray-500 w-full h-full px-8 py-4 md:px-10 xl:px-20 flex flex-col'>
            <div className='py-2 flex justify-between items-center'>
              <div className='flex gap-2'>
                <div className='flex items-center'>
                  <img className='w-[32px] aspect-square object-cover rounded-full border-black border' src='https://th.bing.com/th/id/OIP.C-CcTNtfhJ2WSf524szKLgHaHa?pid=ImgDet&w=205&h=205&c=7' alt='Nhân viên hỗ trợ'></img>
                </div>
                <div className='text-[12.5px]'>
                  <div className='font-semibold text-gray-700 text-[13.5px]'>
                    <span>Nhân viên hỗ trợ</span>
                    <span className='ml-1 text-[10px]'>{isConnectWebsocket ? "🟢" : "🔴"}</span>
                  </div>
                  <p className='font-thin'>Hoạt động 12 phút trước</p>
                </div>
              </div>
              <div>
                <button onClick={() => setIsOpenChat(false)} className='items-center flex'><CloseOutlined /></button>
              </div>
            </div>

            <div className='flex-1 overflow-y-auto p-2 gap-2'>
              <div className='flex flex-col gap-2'>
                {messages.map((msg, index) => (
                  <div key={index} className={`flex w-5/6 break-words items-center ${msg.type === ETypeMessage.SEND ? "justify-start" : "justify-end"}`}>
                    <div className={`bg-opacity-30 w-full ${msg.type === ETypeMessage.SEND ? "bg-blue-600 py-1 px-3 rounded-r-xl" : ""}`}>
                      <div className='text-sm text-gray-800'><span>{msg.message}</span></div>
                      <div className='flex w-full justify-end text-[10px] font-semibold text-gray-600'><span>{timeDisplay(msg.createAt)}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='bg-white border-t-2 border-b-2 border-dotted border-gray-300 min-h-12'>
              <div className='flex justify-center w-full items-end py-2'>
                <div><button className='px-1'><UploadFileOutlined className='text-gray-500' /></button></div>
                <div><button className='px-1'><AddReactionOutlined className='text-gray-500' /></button></div>
                <div className='overflow-y-auto max-h-20'>
                    <textarea
                      ref={textareaRef}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className='max-h-24 text-sm focus:outline-none min-w-60 resize-none overflow-hidden px-1'
                      placeholder='Gửi tin nhắn ...'
                      onInput={handleInput}
                      rows={1}
                    />
                </div>
                <div><button onClick={handleSend} className='text-gray-500 px-1'><SendOutlined /></button></div>
              </div>
            </div>

          </div>
        </div>
      </Suspense>
    </Fragment>
  );
};

export default ChatRoom;
