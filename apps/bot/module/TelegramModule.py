from telethon import TelegramClient
import asyncio

class TelegramModule():
    api_id = 10840
    api_hash = '33c45224029d59cb3ad0c16134215aeb'
    def __init__(self) -> None:
        pass
    
    async def connect(self, path_file: str) -> TelegramClient:
        client = TelegramClient(path_file, api_id=self.api_id, api_hash=self.api_hash, device_model="iPhone 15 Pro Max", system_version="14.8.1", app_version="app_version", lang_code="en", system_lang_code="en-US", lang_pack="ios")
        # client = TelegramClient(path_file, api_id=self.api_id, api_hash=self.api_hash, device_model="iPhone 15 Pro Max", system_version="14.8.1", app_version="app_version", lang_code="en", system_lang_code="en-US")
        await client.connect()
        return client
    
    async def get_tl_message(self, client: TelegramClient) -> str:
        if await client.is_user_authorized():
            message = await client.get_messages(int(777000), limit = 1)
            print(message[0].message)
            return message[0].message
        else:
            return "Account can't connect !!!"