
import { useState, useEffect } from "react"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import TaskList from "./components/TaskList"
import TaskForm from "./components/TaskForm"
import { Button } from "./components/ui/button"
import { Card, CardContent } from "./components/ui/card"
import { Badge } from "./components/ui/badge"
import { ClipboardList, Sparkles, Zap, Brain, ArrowRight, Github, Twitter, MessageCircle } from "lucide-react"

const API_BASE_URL = "http://localhost:8080/api"

export default function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/tasks`)
      setTasks(response.data)
    } catch (error) {
      toast.error("Failed to fetch tasks")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTask = async (input) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/tasks/parse`, { input })
      setTasks([...tasks, response.data])
      toast.success("Task created successfully")
    } catch (error) {
      toast.error("Failed to create task")
    }
  }

  const handleUpdateTask = async (id, taskData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/tasks/${id}`, taskData)
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)))
      toast.success("Task updated successfully")
    } catch (error) {
      toast.error("Failed to update task")
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/tasks/${id}`)
      setTasks(tasks.filter((task) => task.id !== id))
      toast.success("Task deleted successfully")
    } catch (error) {
      toast.error("Failed to delete task")
    }
  }

  const examples = [
    "Schedule team meeting for next Monday at 10 AM",
    "Remind me to submit the report by Friday",
    "Call John regarding project updates tomorrow morning",
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-lg blur-sm"></div>
              <ClipboardList className="relative w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">TaskMaster AI</h2>
              <div className="flex items-center space-x-1">
                <Sparkles className="w-3 h-3 text-accent" />
                <span className="text-xs text-muted-foreground">Powered by AI</span>
              </div>
            </div>
          </div>
          <nav className="flex items-center space-x-2">
          
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-lg"
            >
              <Zap className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </nav>
        </div>
      </header>

      {/* Enhanced Hero Section */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 mb-16">
            <div className="space-y-4">
              <Badge
                variant="secondary"
                className="px-4 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20"
              >
                <Brain className="w-4 h-4 mr-2" />
                AI-Powered Task Management
              </Badge>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
                Natural Language
                <br />
                <span className="text-foreground">Task Manager</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Transform your thoughts into organized tasks instantly with AI-powered natural language processing. Just
                speak naturally, and watch your ideas become actionable tasks.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white shadow-xl px-8 py-3"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3 border-primary/20 hover:bg-primary/5">
                Watch Demo
              </Button>
            </div>
          </div>

          <div className="space-y-12">
            {/* Enhanced Examples Section */}
            <Card className="bg-gradient-to-r from-card/50 to-secondary/30 backdrop-blur-sm border-border/50 shadow-xl">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-2">Try these examples</h3>
                  <p className="text-muted-foreground">Click on any example to see the magic happen</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {examples.map((example, index) => (
                    <Card
                      key={index}
                      className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-border/50 hover:border-primary/30 bg-background/80 backdrop-blur-sm"
                      onClick={() => handleCreateTask(example)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                            <span className="text-primary font-semibold text-sm">{index + 1}</span>
                          </div>
                          <p className="text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                            "{example}"
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Task Form */}
            <Card className="shadow-2xl border-border/50 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-2">Create Your Task</h3>
                  <p className="text-muted-foreground">Describe what you need to do in plain English</p>
                </div>
                <TaskForm onSubmit={handleCreateTask} />
              </CardContent>
            </Card>

            {/* Enhanced Task List */}
            <Card className="shadow-2xl border-border/50 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground mb-2">Your Tasks</h3>
                    <p className="text-muted-foreground">Manage and track your progress</p>
                  </div>
                  <Badge variant="secondary" className="px-3 py-1">
                    {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
                  </Badge>
                </div>

                {loading ? (
                  <div className="flex flex-col items-center justify-center h-48 space-y-4">
                    <div className="relative">
                      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    </div>
                    <p className="text-muted-foreground">Loading your tasks...</p>
                  </div>
                ) : (
                  <TaskList tasks={tasks} onUpdateTask={handleUpdateTask} onDeleteTask={handleDeleteTask} />
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-card to-secondary/20 border-t border-border/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <ClipboardList className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-bold text-foreground">TaskMaster AI</h3>
              </div>
              <p className="text-muted-foreground mb-6 max-w-md">
                Empowering productivity through natural language task management. Transform the way you organize and
                complete your work.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" className="hover:bg-primary/10 hover:border-primary/30">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="hover:bg-primary/10 hover:border-primary/30">
                  <Github className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="icon" className="hover:bg-primary/10 hover:border-primary/30">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Support Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Tutorials
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Company</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border/50">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-muted-foreground text-sm">
                &copy; {new Date().getFullYear()} TaskMaster AI. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <Toaster
        position="bottom-right"
        toastOptions={{
          className: "bg-popover text-popover-foreground border border-border shadow-lg",
          duration: 4000,
          style: {
            borderRadius: "12px",
            background: "hsl(var(--popover))",
            color: "hsl(var(--popover-foreground))",
            border: "1px solid hsl(var(--border))",
          },
        }}
      />
    </div>
  )
}
