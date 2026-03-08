type LogLevel = "info" | "warn" | "error";

type LogContext = Record<string, unknown>;

function formatLog(level: LogLevel, message: string, context?: LogContext) {
	const entry = {
		timestamp: new Date().toISOString(),
		level,
		message,
		...context
	};

	return JSON.stringify(entry);
}

export const logger = {
	info(message: string, context?: LogContext) {
		console.log(formatLog("info", message, context));
	},
	warn(message: string, context?: LogContext) {
		console.warn(formatLog("warn", message, context));
	},
	error(message: string, context?: LogContext) {
		console.error(formatLog("error", message, context));
	}
};
