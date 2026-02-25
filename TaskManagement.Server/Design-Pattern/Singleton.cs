using Microsoft.IdentityModel.Abstractions;

namespace TaskManagement.Server.Design_Pattern
{


    #region SingletonNotThreadSafeImplementation
    public class SingletonNotThreadSafe
    {
        private static SingletonNotThreadSafe instance;
        private SingletonNotThreadSafe() { }  // Private constructor
        public static SingletonNotThreadSafe GetInstance()
        {
            if (instance == null) instance = new SingletonNotThreadSafe();
            return instance;
        }
    }
    #endregion


    #region SingletonThreadSafeImplementation
    public class SingletonThreadSafe
    {
        private static SingletonThreadSafe instance;
        private static readonly object lockObject = new object();
        // Private constructor prevents instantiation
        private SingletonThreadSafe() { }
        public static SingletonThreadSafe GetInstance()
        {
            lock (lockObject)
            {
                if (instance == null)  instance = new SingletonThreadSafe();
                return instance;
            }
        }
    }
    #endregion


}