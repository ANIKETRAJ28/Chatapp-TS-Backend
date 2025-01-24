import { Server } from 'socket.io';

let io: Server | null = null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initSocket = (server: any) => {
  io = new Server(server, {
    pingTimeout: 60000,
    cors: {
      origin: 'http://localhost:5173',
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    socket.on('setup', (id) => {
      socket.join(id);
      console.log(`User joined room: ${id}`);
      socket.emit('connected');
    });

    socket.on('new message', (newMsg) => {
      socket.broadcast.to(newMsg.communityId).emit('message received', newMsg);
    });

    socket.on('disconnect', () => {});
  });

  return io;
};

export const getIO = (): Server => {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
};
