# Two-way chat application (TWCA)

`TWCA` is a real-time, two-way chat application using NextJS and integrates it with a free account on PubNub.
To demonstrate skills around front-end development and integration with 3rd party APIs, this app has been built as a fake real-time two-way chat between two clients.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Prerequisites

This application uses [NextJS v14.2.4](https://www.npmjs.com/package/next/v/14.2.4) ,[React v18](https://www.npmjs.com/package/react/v/18.0.0), [ReactDOM v18](https://www.npmjs.com/package/react-dom), [PubNub JavaScript SDK v7.6.3](https://www.pubnub.com/docs/sdks/javascript/), and [PubNub React SDK v3.0.2](https://www.pubnub.com/docs/chat/react/setup).

To use the app, you need:

- [yarn](https://classic.yarnpkg.com/en/docs/install)
- [Node.js](https://nodejs.org/en/download/)
- Code editor (e.g. [Visual Studio Code](https://code.visualstudio.com/download))
- PubNub [account](https://www.pubnub.com/docs/setup/account-setup) on the [Admin Portal](https://admin.pubnub.com/) with [Publish and Subscribe Keys](https://www.pubnub.com/docs/basics/initialize-pubnub) for your chat app with the default configuration.

## Usage

Follow the steps to run the app locally.

1. Clone the repository.

   ```bash
   git clone https://github.com/pubnub/react-chat-components.git
   ```

2. Install the dependencies.

   ```bash
   npm i
   ```

3. Paste your Publish and Subscribe Keys on `.env.local` file.

4. Go to the `live-chat` folder.

   ```bash
   cd live-chat
   ```

5. Run the application.

   ```bash
   npm run build
   npm run start
   ```

# Run Test

1. Install Playwright and lunch app in root.
   npm init playwright@latest
   npm run build
   npm run start

2. Go to tests folder from root.
   cd tests

3. Open Playwright test runner to run tests interactively in tests folder
   npx playwright test

## Components

- [Chat Provider](https://www.pubnub.com/docs/chat/components/react/chat-provider)
- [Message List](https://www.pubnub.com/docs/chat/components/react/ui-components/message-list)
- [Message Input](https://www.pubnub.com/docs/chat/components/react/ui-components/message-input)

## Usernames

You can log into the app either as a Company(Interviewer) or as one of the interviewee.
Type in one of the available usernames and tap Log in. You don't need a password to log in.

### Interviewee

- Terrell
- Mary

### Company

- Aaron
