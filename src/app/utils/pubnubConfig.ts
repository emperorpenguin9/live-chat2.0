import PubNub from "pubnub";

export const createPubNub = (uuid: string) => {
  const pubnub = new PubNub({
    publishKey: process.env.NEXT_PUBLIC_PUB_KEY!,
    subscribeKey: process.env.NEXT_PUBLIC_SUB_KEY!,
    secretKey: process.env.NEXT_PUBLIC_SECRET_KEY!,
    uuid: uuid,
  });

  return pubnub;
};
